import React from 'react';
import { GenericMolSetCard, MolsetActivitiesSummary, MolsInMolSetList, GenericInfo, EditMolSet } from '../../../../genui';
import { AssayName, ChEMBLID, Relation, TargetName } from './ActivityFields';
import key from "weak-key";

function MolsStats(props) {
  return (
      <React.Fragment>
        <h4>Compounds</h4>
        <p>Unique in Total: {props.moleculesCount}</p>
        <h4>Associated Targets</h4>
        <ul>
          {
            props.molset.targets.map(
                target => (
                    <li key={target.targetID}>
                      <a rel="noopener noreferrer" href={`https://www.uniprot.org/uniprotkb/${target.targetID}/`} target="_blank">{target.targetID}</a>
                    </li>
                )
            )
          }
        </ul>
      </React.Fragment>
  )
}

function PapyrusCard(props) {
  const taskErrorClassToComponent = {
    "<class 'genui.compounds.initializers.exceptions.InconsistentIdentifiersException'>" : props => {
      console.log(props.error.data);
      return (
          <React.Fragment>
            {props.error.messages.original.map(message => <span key={key({dummy: message})}>{message}</span>)}
          </React.Fragment>
      )
    }
  };

  const tabs = [
    {
      title : "Info",
      renderedComponent : (props) => <GenericInfo {...props} customMolStats={MolsStats} taskErrorClassToComponent={taskErrorClassToComponent}/>,
    },
    {
      title: "Compounds",
      renderedComponent : (props) => (
        <MolsInMolSetList
          {...props}
          showInfo={true}
          extraActivityFields={
            [
              {
                dataItems: ["extraArgs.relation"],
                propNames: ["relation"],
                displayName: "Relation",
                component: Relation,
                className: "PapyrusActivity"
              },
              {
                dataItems: ["extraArgs.assay"],
                propNames: ["assayID"],
                displayName: "Assay",
                component: AssayName,
                className: "PapyrusActivity"
              },
              {
                dataItems: ["extraArgs.target"],
                propNames: ["targetID"],
                displayName: "Target",
                component: TargetName,
                className: "PapyrusActivity"
              },
            ]
          }
        />)
    },
    {
      title: "Activities",
      renderedComponent: props => <MolsetActivitiesSummary {...props} selectable={false}/>
    },
    {
      title: "Edit",
      renderedComponent: props => <EditMolSet {...props}/>
    }
  ];

  const [assayMap, setAssayMap] = React.useState({});
  const [targetMap, setTargetMap] = React.useState({});

  return (
      <GenericMolSetCard
          {...props}
          tabs={tabs}
          assayMap={assayMap}
          targetMap={targetMap}
          hideUnits={true}
          addToAssayMap={(id, chemblID) => {
            if (!assayMap.hasOwnProperty(id)) {
              assayMap[id] = chemblID;
              setAssayMap(assayMap)
            }
          }}
          addToTargetMap={(id, chemblID) => {
            if (!targetMap.hasOwnProperty(id)) {
              targetMap[id] = chemblID;
              setTargetMap(targetMap)
            }
          }}
      />
  )
}

export default PapyrusCard;
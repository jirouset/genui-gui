import { ComponentWithResources } from '../../../../genui';
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function AssayLink(props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const assayIDs = props.assayID
    .split(';')
    .map(id => id.trim())
    .filter(id => id.length > 0);

  if (assayIDs.length === 1) {
    return (
      <a
        href={`https://www.ebi.ac.uk/chembl/assay_report_card/${assayIDs[0]}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {assayIDs[0]}
      </a>
    );
  }

  return (
    <>
      <Button color="info" size="sm" onClick={toggleModal}>
        Show all
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal} >
        <ModalHeader toggle={toggleModal}>Associated assays</ModalHeader>
        <ModalBody>
          <div style={{ wordWrap: 'break-word' }}>
            {assayIDs.map(id => (
              <div key={id}>
                <a
                  href={`https://www.ebi.ac.uk/chembl/assay_report_card/${id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {id}
                </a>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function TargetLink(props) {
  return <a rel="noopener noreferrer" href={`https://www.uniprot.org/uniprotkb/${props.targetID}/`} target="_blank">{props.targetID}</a>
}


export function AssayName(props) {
  if (props.assayMap.hasOwnProperty(props.assayID)) {
    return <AssayLink assayID={props.assayMap[props.assayID]}/>
  } else {
    const definition = {
      assay: new URL(`assays/${props.assayID}/`, props.molsetListUrl)
    };
    return (
        <ComponentWithResources
            {...props}
            definition={definition}
        >
          {
            (loaded, assayData) => {
              if (loaded) {
                const assayID = assayData.assay.assayID;
                props.addToAssayMap(props.assayID, assayID);
                return <AssayLink assayID={assayID}/>
              } else {
                return <span>-</span>
              }
            }
          }
        </ComponentWithResources>
    )
  }
}

export function TargetName(props) {

  if (props.targetMap.hasOwnProperty(props.targetID)) {
    return <TargetLink targetID={props.targetMap[props.targetID]}/>
  } else {
    const definition = {
      target: new URL(`targets/${props.targetID}/`, props.molsetListUrl)
    };
    return (
        <ComponentWithResources
            {...props}
            definition={definition}
        >
          {
            (loaded, targetData) => {
              if (loaded) {
                const targetID = targetData.target.targetID;
                props.addToTargetMap(props.targetID, targetID);
                return <TargetLink targetID={targetID}/>
              } else {
                return <span>-</span>
              }
            }
          }
        </ComponentWithResources>
    )
  }
}

export function Relation(props) {
  return <span>{props.relation}</span>
}

export function ChEMBLID(props) {
  return <a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/compound_report_card/${props.compoundID}/`} target="_blank">{props.compoundID}</a>
}
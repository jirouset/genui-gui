import React from 'react';
import {GenericMolSetGrid} from '../../../../genui';
import PapyrusCard from './PapyrusCard';
import PapyrusCardNew from './PapyrusCardNew';

class PapyrusGrid extends React.Component {

  render() {
    const listUrl = new URL('papyrus/', this.props.apiUrls.compoundSetsRoot);
    return (
      <GenericMolSetGrid
        {...this.props}
        headingText="Papyrus Compounds"
        cardComponent={PapyrusCard}
        newCardComponent={PapyrusCardNew}
        molsetListUrl={listUrl}
      />
    )
  }
}

export default PapyrusGrid;
import * as React from 'react';

import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useNavigate } from 'react-router-dom';

export default function Tree({items}) {
  const navigate = useNavigate()
  return (
    <RichTreeView
      items={items}
      itemChildrenIndentation={24}
      onItemClick={(e, itemId) => {if(!(itemId.startsWith('_'))) navigate(`/${itemId}`)}}
      defaultExpandedItems={['grid']}
    />
  );
}

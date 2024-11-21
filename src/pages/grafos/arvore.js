import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Tree from 'react-d3-tree';

const Arvore = () => {
  const [treeData, setTreeData] = useState([
    { id: 0, name: `Root` }
  ]);
  const [itemId, setItemId] = useState(1)
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeName, setNodeName] = useState('');

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setNodeName(node.data.name || '');
  };

  const handleNameChange = (e) => {
    setNodeName(e.target.value);
  };

  const updateNodeInTree = (node, id, updatedNode) => {
    if (node.id === id.id) {
      setSelectedNode(null)
      return updatedNode;
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) =>
          updateNodeInTree(child, id, updatedNode)
        ),
      };
    }
    return node;
  };

  const deleteNodeInTree = (node, id) => {
    if (node.children) {
      if (node.children.find((obj) => obj.id === id.id)) {
        node.children = node.children.filter((obj) => obj.id !== id.id)
        setSelectedNode(null)
        return node
      }
      return {
        ...node,
        children: node.children.map((child) =>
          deleteNodeInTree(child, id)
        ),
      };
    }
    return node
  };

  const handleUpdateNode = () => {
    if (selectedNode) {
      const updatedTree = treeData.map((node) =>
        updateNodeInTree(node, selectedNode.data, {
          ...selectedNode.data,
          name: nodeName,
        })
      );
      setTreeData(updatedTree);
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      if (selectedNode.data.id === 0) {
        return alert("Não é possivel excluir o Root")
      }
      const updatedTree = treeData.map((node) =>
        deleteNodeInTree(node, selectedNode.data)
      );
      setTreeData(updatedTree);
    }
  };

  const handleAddChild = () => {
    if (selectedNode) {
      const newChild = { id: itemId, name: `New Node ${itemId}` }; // Unique child node
      setItemId(itemId+1)
      const updatedTree = treeData.map((node) =>
        updateNodeInTree(node, selectedNode.data, {
          ...selectedNode.data,
          children: [...(selectedNode.data.children || []), newChild],
        })
      );
      setTreeData(updatedTree);
    }
  };

  return (
    <Box display="flex" height="100vh" flexDirection="row">
      <Box flex={1} height="100%" borderRight="1px solid #ddd" padding={2}>
        <h3>Edit Node</h3>
        {selectedNode ? (
          <>
            <TextField
              label="Node Name"
              value={nodeName}
              onChange={handleNameChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateNode}
              sx={{ marginRight: 1 }}
            >
              Update Node
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteNode}>
              Delete Node
            </Button>
            <Button variant="contained" color="secondary" onClick={handleAddChild}>
              Add Child Node
            </Button>
          </>
        ) : (
          <p>Select a node to edit</p>
        )}
      </Box>
      <Box flex={3} sx={{ backgroundColor: 'white' }}>
        <Tree
          data={treeData}
          orientation="horizontal"
          onNodeClick={handleNodeClick}
          collapsible={false} // Disable collapsibility
        />
      </Box>
    </Box>
  );
};

export default Arvore;

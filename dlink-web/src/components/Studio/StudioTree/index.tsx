import React, {useEffect, useRef, useState} from "react";
import {connect} from "umi";
import  {DownOutlined, FrownFilled, FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import {Tree, Input, Menu, Empty, Button, message, Modal} from 'antd';
import {getCatalogueTreeData} from "@/pages/FlinkSqlStudio/service";
import {convertToTreeData, DataType, TreeDataNode} from "@/components/Studio/StudioTree/Function";
import style from "./index.less";
import {StateType} from "@/pages/FlinkSqlStudio/model";
import {getInfoById, handleAddOrUpdate, handleInfo, handleRemove, handleSubmit} from "@/components/Common/crud";
import UpdateCatalogueForm from './components/UpdateCatalogueForm';
import {ActionType} from "@ant-design/pro-table";
import UpdateTaskForm from "@/components/Studio/StudioTree/components/UpdateTaskForm";

const { DirectoryTree } = Tree;

const {Search} = Input;

type StudioTreeProps = {};

type RightClickMenu = {
  pageX: number,
  pageY: number,
  id: number,
  categoryName: string
};

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const StudioTree: React.FC<StudioTreeProps> = (props) => {

  const [treeData, setTreeData] = useState<TreeDataNode[]>();
  const [dataList, setDataList] = useState<[]>();
  const [rightClickNodeTreeItem,setRightClickNodeTreeItem] = useState<RightClickMenu>();
  const {currentPath,dispatch,tabs} = props;
  const [updateCatalogueModalVisible, handleUpdateCatalogueModalVisible] = useState<boolean>(false);
  const [updateTaskModalVisible, handleUpdateTaskModalVisible] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [catalogueFormValues, setCatalogueFormValues] = useState({});
  const [taskFormValues, setTaskFormValues] = useState({});
  const [rightClickNode, setRightClickNode] = useState<TreeDataNode>();

  const getTreeData = async () => {
    const result = await getCatalogueTreeData();
    let data = result.datas;
    let list = data;
    for(let i=0;i<list.length;i++){
      list[i].title=list[i].name;
      list[i].key=list[i].id;
    }
    setDataList(list);
    data = convertToTreeData(data, 0);
    setTreeData(data);
  };

  useEffect(() => {
    getTreeData();
  }, []);

  const onChange = (e:any) => {

  };

  const handleMenuClick=(key:string)=>{
    setRightClickNodeTreeItem(null);
    if(key=='Open'){
      toOpen(rightClickNode);
    }else if(key=='Submit'){
      toSubmit(rightClickNode);
    }else if(key=='CreateCatalogue'){
      createCatalogue(rightClickNode);
    }else if(key=='CreateTask'){
      createTask(rightClickNode);
    }else if(key=='Rename'){
      toRename(rightClickNode);
    }else if(key=='Delete'){
      toDelete(rightClickNode);
    }
  };

  const toOpen=(node:TreeDataNode)=>{
    if(node.isLeaf&&node.taskId) {
      for(let item of tabs.panes){
        if(item.key==node.taskId){
          dispatch&&dispatch({
            type: "Studio/changeActiveKey",
            payload: node.taskId,
          });
          return;
        }
      }
      const result = getInfoById('/api/task',node.taskId);
      result.then(result=>{
        let newTabs = tabs;
        let newPane = {
          title: node.name,
          key: node.taskId,
          value:(result.datas.statement?result.datas.statement:''),
          closable: true,
          task:{
            session:'admin',
            maxRowNum: 100,
            ...result.datas
          },
          console:{
            result:[],
          }
        };
        newTabs.activeKey = node.taskId;
        newTabs.panes.push(newPane);
        dispatch&&dispatch({
          type: "Studio/saveTabs",
          payload: newTabs,
        });
      })
    }
  };

  const createCatalogue=(node:TreeDataNode)=>{
    if(!node.isLeaf) {
      handleUpdateCatalogueModalVisible(true);
      setIsCreate(true);
      setCatalogueFormValues({
        isLeaf: false,
        parentId: node.id,
      });
      getTreeData();
    }else{
      message.error('??????????????????????????????');
    }
  };

  const toSubmit=(node:TreeDataNode)=>{
    Modal.confirm({
      title: '????????????',
      content: '????????????????????????????????????????????????',
      okText: '??????',
      cancelText: '??????',
      onOk:async () => {
        let task = {
          id:node.taskId,
        };
        handleSubmit('/api/task/submit','??????',[task]);
      }
    });
  };

  const toRename=(node:TreeDataNode)=>{
    handleUpdateCatalogueModalVisible(true);
    setIsCreate(false);
    setCatalogueFormValues({
      id: node.id,
      name: node.name,
    });
    getTreeData();
  };

  const createTask=(node:TreeDataNode)=>{
    if(!node.isLeaf) {
      handleUpdateTaskModalVisible(true);
      setIsCreate(true);
      setTaskFormValues({
        parentId: node.id,
      });
      getTreeData();
    }else{
      message.error('??????????????????????????????');
    }
  };

  const toDelete= (node:TreeDataNode)=>{
    let label = (node.taskId==null)?'??????':'??????';
    Modal.confirm({
      title: `??????${label}`,
      content: `???????????????${label}??????`,
      okText: '??????',
      cancelText: '??????',
      onOk:async () => {
        await handleRemove('/api/catalogue',[node]);
        getTreeData();
      }
    });
  };

  const getNodeTreeRightClickMenu = () => {
    const {pageX, pageY} = {...rightClickNodeTreeItem};
    const tmpStyle = {
      position: 'absolute',
      // left: `${pageX - 50}px`,
      // top: `${pageY - 202}px`,
      left: `${pageX - 30}px`,
      top: `${pageY - 152}px`,
    };
    let menuItems;
    if(rightClickNode&&rightClickNode.isLeaf){
      menuItems=(<>
        <Menu.Item key='Open'>{'??????'}</Menu.Item>
        <Menu.Item key='Submit'>{'????????????'}</Menu.Item>
        <Menu.Item key='Rename'>{'?????????'}</Menu.Item>
        <Menu.Item key='Delete'>{'??????'}</Menu.Item>
      </>)
    }else if(rightClickNode&&rightClickNode.children&&rightClickNode.children.length>0){
      menuItems=(<>
        <Menu.Item key='CreateCatalogue'>{'????????????'}</Menu.Item>
        <Menu.Item key='CreateTask'>{'????????????'}</Menu.Item>
        <Menu.Item key='Rename'>{'?????????'}</Menu.Item>
      </>)
    }else{
      menuItems=(<>
        <Menu.Item key='CreateCatalogue'>{'????????????'}</Menu.Item>
        <Menu.Item key='CreateTask'>{'????????????'}</Menu.Item>
        <Menu.Item key='Rename'>{'?????????'}</Menu.Item>
        <Menu.Item key='Delete'>{'??????'}</Menu.Item>
      </>)
    }
    const menu = (
      <Menu
        onClick={({key}) => handleMenuClick(key)}
        style={tmpStyle}
        className={style.right_click_menu}
      >
        {menuItems}
      </Menu>
    );
    return (rightClickNodeTreeItem == null) ? '' : menu;
  };

  const getEmpty = () =>{
    const empty = (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} ><Button type="primary" onClick={() => {
      handleUpdateCatalogueModalVisible(true);
      setIsCreate(true);
      setCatalogueFormValues({
        isLeaf:false,
        parentId:0,
      });
    }}>????????????</Button></Empty>);
    return (treeData&&treeData.length==0)?empty:'';
  };

  const onRightClick = (e:any) => {
    setRightClickNode(e.node);
    setRightClickNodeTreeItem({
      pageX: e.event.pageX,
      pageY: e.event.pageY,
      id: e.node.id,
      categoryName: e.node.name
    });
  };

  const onSelect = (selectedKeys:[], e:any) => {
    dispatch({
      type: "Studio/saveCurrentPath",
      payload: e.node.path,
    });
    setRightClickNodeTreeItem(null);
  };

  return (
    <div className={style.tree_div}>
      <Search style={{marginBottom: 8}} placeholder="Search" onChange={onChange}/>
        <DirectoryTree
          multiple
          onRightClick={onRightClick}
          onSelect={onSelect}
          switcherIcon={<DownOutlined/>}
          treeData={treeData}
        />
      {getNodeTreeRightClickMenu()}
      {getEmpty()}
      {updateCatalogueModalVisible? (
        <UpdateCatalogueForm
          onSubmit={async (value) => {
            const success = await handleAddOrUpdate(
              isCreate?'/api/catalogue':'/api/catalogue/toRename',value);
            if (success) {
              handleUpdateCatalogueModalVisible(false);
              setCatalogueFormValues({});
              getTreeData()
            }
          }}
          onCancel={() => {
            handleUpdateCatalogueModalVisible(false);
            setCatalogueFormValues({});
          }}
          updateModalVisible={updateCatalogueModalVisible}
          values={catalogueFormValues}
          isCreate={isCreate}
        />
      ) : null}
      {updateTaskModalVisible? (
        <UpdateTaskForm
          onSubmit={async (value) => {
            const success = await handleAddOrUpdate('/api/catalogue/createTask',value);
            if (success) {
              handleUpdateTaskModalVisible(false);
              setTaskFormValues({});
              getTreeData()
            }
          }}
          onCancel={() => {
            handleUpdateTaskModalVisible(false);
            setTaskFormValues({});
          }}
          updateModalVisible={updateTaskModalVisible}
          values={taskFormValues}
          isCreate={isCreate}
        />
      ) : null}
    </div>
  );
};


export default connect(({Studio}: { Studio: StateType }) => ({
  currentPath:Studio.currentPath,
  tabs: Studio.tabs,
}))(StudioTree);

import React from "react";
import { useParams } from "react-router-dom";

const Create = (props) => {
  return (
    <props.route.vue.Create {...props} />
  )
}

const GetAll = (props) => {
  return (
    <props.route.vue.GetAll {...props} />
  )
}

const GetOne = (props) => {
  const {id} = useParams();
  return (
    <props.route.vue.GetOne {...props} uid={id} />
  )
}


const Update = (props) => {
  const {id} = useParams();

  return (
    <props.route.vue.Update {...props} uid={id} />
  )
}


const Delete = (props) => {
  const {id} = useParams();

  return (
    <props.route.vue.Delete {...props} uid={id} />
  )
}

const TableCrud =  {
  Create,
  GetAll,
  GetOne,
  Update,
  Delete
}

export default TableCrud;

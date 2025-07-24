import { StyleSheet, Text, View } from 'react-native';
import React,{useState,useContext} from 'react';
import AuthStack from './AuthStack/AuthStack';
import MainStack from './MainStack/MainStack';
import {AuthContext} from '../context/AuthContext';

const Navigator = () => {
  
const {user} = useContext(AuthContext);
  return user && user.accessToken?<MainStack/>:<AuthStack/>;
}

export default Navigator;

const styles = StyleSheet.create({})
import { create } from "zustand";
import { Iui } from './types';


const alertStore=create<Iui>(set=>({
    alert:false,
    alertFn:()=>{},
    closeAlert:()=>{set({alert:false})},
    showAlert:()=>{set({alert:true})},
    setAlertFn:(fn)=>{set({alertFn:fn})}
}))

export default alertStore
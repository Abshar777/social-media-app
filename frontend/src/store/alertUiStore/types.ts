export interface Iui{
    alert:boolean,
    alertFn:Function,
    showAlert:Function
    closeAlert:Function
    setAlertFn:(fn:Function)=>void
}
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.kt.excle.excle.controller.View1", {
            onInit: function () {
                this.localModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.localModel, "localModel");

                this.localModel2 = new sap.ui.model.json.JSONModel();
                this.getOwnerComponent().setModel(this.localModel2, "localModel2");
            },
        
            onUpload: function (e) {
                this._import(e.getParameter("files") && e.getParameter("files")[0]);
            },
    
            _import: function (file) {
                var that = this;
                var header = {}
                var item = {}
                // var excelData = {};
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        workbook.SheetNames.forEach(function (sheetName) {
                            if(sheetName==="Headerjson"){
                                header = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                            }else if(sheetName==="Itemjson"){
                                item = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                            }
    
                        });               
                        that.localModel.setData({
                            items: header
                        });
                        that.localModel.refresh(true);

                        that.localModel2.setData({
                            items: item
                        });
                        that.localModel2.refresh(true);
                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }
            },     
            onPresNavigation : function(oEvent){
                var sPath = oEvent.getSource().getBindingContext("localModel").getObject().CoucurID;
                var oRouter=this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView2", {
                    expID : sPath
                });
            },
        });
    });

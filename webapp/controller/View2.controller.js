sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.kt.excle.excle.controller.View2", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView2").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function(oEvent) {
                var sArg = oEvent.getParameter("arguments").expID;
                var oData = this.getOwnerComponent().getModel("localModel2").getData();
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel, "oExpModel");
                var nameFilter = new sap.ui.model.Filter("CoucurID", sap.ui.model.FilterOperator.EQ, sArg );
                this.byId("tabel").getBinding('items').filter(nameFilter)
                
            }
        });
    });

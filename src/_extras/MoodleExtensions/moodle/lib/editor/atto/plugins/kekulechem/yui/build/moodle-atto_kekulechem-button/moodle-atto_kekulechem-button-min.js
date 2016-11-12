YUI.add("moodle-atto_kekulechem-button",function(e,t){var n=e.namespace("M.atto_kekulechem");n.Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{BTN_NAME_OBJ_INSERT:"kekuleChemObjInsert",CHEM_OBJ_INSERTER_CLASS:"KekuleChemObjInserter",CHEM_OBJ_VIEWER_CLASS:"KekuleChemObjViewer",CHEM_OBJ_TAGNAME:"img",initializer:function(){this._preparingForSubmit=!1;var e=this.get("attoKekulePluginPath")+"pix/icon.gif";this.addButton({buttonName:this.BTN_NAME_OBJ_INSERT,iconurl:e,callback:this._execute,tags:"strike"}),this._addEssentialFiles();var t=this.get("host"),n=this,r=t.textarea.getDOMNode().form;Kekule.X.domReady(function(){if(Kekule.Editor.ChemSpaceEditorConfigs&&Kekule.Editor.ChemSpaceEditorConfigs.getInstance){var e=Kekule.Editor.ChemSpaceEditorConfigs.getInstance();e.getInteractionConfigs().setAllowUnknownAtomSymbol(!1)}}),Kekule.X.Event.addListener(r,"submit",function(e){n._prepareForSubmit()}),t.on("change",function(){n._prepareForDisplay()}),Kekule.X.domReady(function(){n._prepareForDisplay()})},_getPurifyHtml:function(){var e=this.get("purifyHtml");return Kekule.StrUtils.strToBool(e)},_addEssentialFiles:function(){var e=this.get("kekuleCssUrl"),t=this.get("kekuleMooduleUrl");this._addCssUrl(e),this._addCssUrl(t)},_addCssUrl:function(e){var t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",e),document.head.appendChild(t)},_prepareForDisplay:function(){if(this._preparingForSubmit)return;if(!this._getPurifyHtml())return;var e=this._getEditorRootElem(),t=e.getElementsByTagName(n.ChemObjDataWrapperUtils.CHEM_OBJ_WRAPPER_TAGNAME);for(var r=t.length-1;r>=0;--r){var i=t[r];i&&Kekule.HtmlElementUtils.hasClass(i,n.ChemObjDataWrapperUtils.CHEM_OBJ_WRAPPER_CLASSNAME)&&n.ChemObjDataWrapperUtils.replaceDataWrappersWithImg(i)}},_prepareForSubmit:function(){if(!this._getPurifyHtml())return;this._preparingForSubmit=!0;try{var e=this._getEditorRootElem(),t=e.getElementsByTagName(this.CHEM_OBJ_TAGNAME);for(var r=t.length-1;r>=0;--r){var i=t[r];i&&Kekule.HtmlElementUtils.hasClass(i,this.CHEM_OBJ_VIEWER_CLASS)&&n.ChemObjDataWrapperUtils.replaceImgsWithDataWrapper(i)}this.markUpdated()}finally{var s=this;(function(){s._preparingForSubmit=!1}).defer()}},_getSelectedChemObjTarget:function(){var e=this.get("host"),t=e.getSelectedNodes(),n=e.getSelection()[0],r=[],i=this;return!n||n.collapsed?null:(t.some(function(e){var t=null,n=e.getDOMNode();n&&n.tagName&&(t=i._getParentChemObjElement(n,i._getEditorRootElem()));if(t){r.push(t);if(r.length>1)return!0}}),r.length===1?r[0]:null)},_getEditorRootElem:function(){return this.get("host").editor.getDOMNode()},_getParentChemObjElement:function(e,t){return Kekule.HtmlElementUtils.hasClass(e,this.CHEM_OBJ_VIEWER_CLASS)?e:(e.getAttribute("data-kekule-widget")||"").indexOf("ChemWidget.Viewer")>=0?e:e!==t?this._getParentChemObjElement(e.parentNode,t):null},_execute:function(){var e=this._getSelectedChemObjTarget();e?this._targetElem=e:this._targetElem=null;var t=this.get("host");this._openDialog()},_openDialog:function(){this._inserterDialog||(this._inserterDialog=this._createDialog());var e=this._inserterDialog,t=this._targetElem?M.util.get_string("captionEditChemObj","atto_kekulechem"):M.util.get_string("captionAddChemObj","atto_kekulechem");e.setCaption(t),this._targetElem?this._chemObjInserter.importFromElem(this._targetElem):this._chemObjInserter.setChemObj(null);var n=null,r=this.buttons[this.BTN_NAME_OBJ_INSERT];r&&(n=r.getDOMNode());var i=this;return e.openModal(function(e){e===Kekule.Widget.DialogButtons.OK&&i._submitChemObj()},n),this._forceInserterResize.bind(this).delay(),e},_forceInserterResize:function(){this._chemObjInserter.resized()},_createDialog:function(){var e=new Kekule.Widget.Dialog(document);e.setButtons([Kekule.Widget.DialogButtons.OK,Kekule.Widget.DialogButtons.CANCEL]);var t=e.getClientElem();t.style.minWidth="500px",t.style.minHeight="250px";var n=new Kekule.ChemWidget.ChemObjInserter(document);return n.setResizable(!0),n.appendToWidget(e),this._chemObjInserter=n,e},_submitChemObj:function(){var e=this._chemObjInserter,t=e.getExportImgElemAttributes();t["class"]||(t["class"]=""),t["class"]=" "+this.CHEM_OBJ_VIEWER_CLASS+" K-Transparent-Background";var n=this.get("host");n.focus();if(!this._targetElem){var r=this._getNormalHtmlCode(t);n.insertContentAtFocusPoint(r)}else Kekule.DomUtils.setElemAttributes(this._targetElem,t);this.markUpdated()},_getNormalHtmlCode:function(e){var t=this._generateElemHtmlCode(this.CHEM_OBJ_TAGNAME,null,e);return t},_generateElemHtmlCode:function(e,t,n){var r="<"+e,i=Kekule.ObjUtils.getOwnedFieldNames(n);for(var s=0,o=i.length;s<o;++s){var u=i[s];if(u){var a=n[u];a&&(a=a.toString(),a=a.replace('/"/g',"&quot;"),a=a.replace("/'/g","&#039;"),a=a.replace("/</g","&lt;"),a=a.replace("/>/g","&gt;")),u==="className"&&(u="class"),r+=" "+u+"='"+a+"'"}}return r+=">",t&&(r+=t),r+="</"+e+">",r},_generateHtmlElemsCode:function(e){var t=e.children||[],n=e.tagName,r=e.content||"",i=Object.extend({},e);delete i.tagName,delete i.content,delete i.children;var s="";for(var o=0,u=t.length;o<u;++o){var a=this._generateHtmlElemsCode(t[o]);s+=a}var f=this._generateElemHtmlCode(n,r+s,i);return f}},{ATTRS:{kekuleCssUrl:{value:""},kekuleMoodleCssUrl:{value:""},attoKekulePluginPath:{value:""},purifyHtml:{value:!1}}}),n.ChemObjDataWrapperUtils={CHEM_OBJ_WRAPPER_TAGNAME:"span",CHEM_OBJ_DATA_TAGNAME:"span",CHEM_OBJ_IMG_TAGNAME:"img",CHEM_OBJ_WRAPPER_CLASSNAME:"Kekule-ChemObj-Wrapper",CHEM_OBJ_DATA_CLASSNAME:"Kekule-ChemObj-Wrapper-Data",CHEM_OBJ_IMG_CLASSNAME:"Kekule-ChemObj-Wrapper-Img",getWrapperDetails:function(e){if(Kekule.HtmlElementUtils.hasClass(e,n.ChemObjDataWrapperUtils.CHEM_OBJ_WRAPPER_CLASSNAME)){var t={},r=Kekule.DomUtils.getDirectChildElems(e);if(r&&r.length)for(var i=0,s=r.length;i<s;++i){var o=r[i];Kekule.HtmlElementUtils.hasClass(o,n.ChemObjDataWrapperUtils.CHEM_OBJ_DATA_CLASSNAME)?t.dataElement=o:Kekule.HtmlElementUtils.hasClass(o,n.ChemObjDataWrapperUtils
.CHEM_OBJ_IMG_CLASSNAME)&&(t.imgElement=o)}var u=t.dataElement||e;t.srcData=Kekule.DomUtils.getElementText(u);try{t.data=JSON.parse(t.srcData)}catch(a){}return t}return null},updateWrapperElem:function(e,t){var r=n.ChemObjDataWrapperUtils.getWrapperDetails(e);if(r){var i=e.ownerDocument;r.dataElement||(Kekule.DomUtils.setElementText(e,""),r.dataElement=i.createElement(n.ChemObjDataWrapperUtils.CHEM_OBJ_DATA_TAGNAME),r.dataElement.className=n.ChemObjDataWrapperUtils.CHEM_OBJ_DATA_CLASSNAME,e.appendChild(r.dataElement)),r.imgElement||(r.imgElement=i.createElement(n.ChemObjDataWrapperUtils.CHEM_OBJ_IMG_TAGNAME),r.imgElement.className=n.ChemObjDataWrapperUtils.CHEM_OBJ_IMG_CLASSNAME,e.appendChild(r.imgElement))}Kekule.HtmlElementUtils.addClass(r.dataElement,KekuleMoodle.WidgetDataWrapper.WRAPPER_DATA_HTML_CLASS),Kekule.DomUtils.setElementText(r.dataElement,JSON.stringify(t)),Kekule.StyleUtils.setDisplay(r.dataElement,"none");var s=r.imgElement,o={width:t.width,height:t.height,style:t.style,src:t.src};Kekule.DomUtils.setElemAttributes(s,o),Kekule.HtmlElementUtils.addClass(e,KekuleMoodle.WidgetDataWrapper.WRAPPER_HTML_CLASS)},createWrapperElem:function(e,t){var r=e.createElement(n.ChemObjDataWrapperUtils.CHEM_OBJ_WRAPPER_TAGNAME);return r.className=n.ChemObjDataWrapperUtils.CHEM_OBJ_WRAPPER_CLASSNAME,n.ChemObjDataWrapperUtils.updateWrapperElem(r,t),r},replaceDataWrappersWithImg:function(e){var t=n.ChemObjDataWrapperUtils.getWrapperDetails(e),r=Object.extend({dataWidget:t.widget},t.data),i=e.ownerDocument,s=e.parentNode,o=i.createElement("img");return Kekule.DomUtils.setElemAttributes(o,r),s.insertBefore(o,e),s.removeChild(e),o},replaceImgsWithDataWrapper:function(e){var t=e.ownerDocument,r=e.parentNode,i=Kekule.DomUtils.fetchAttributeValuesToJson(e),s=n.ChemObjDataWrapperUtils.createWrapperElem(t,i);return r.insertBefore(s,e),r.removeChild(e),s}}},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});

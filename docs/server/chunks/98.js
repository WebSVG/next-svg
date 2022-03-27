"use strict";
exports.id = 98;
exports.ids = [98];
exports.modules = {

/***/ 7515:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PanZoom)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var panzoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5773);
/* harmony import */ var panzoom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(panzoom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _svg_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3218);
/* harmony import */ var react_inlinesvg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3831);
/* harmony import */ var react_inlinesvg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_inlinesvg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4173);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_6__);







const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90vw",
    height: "80vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflow: 'hidden',
    cursor: 'grab'
};
const buttonActiveStyle = {
    zIndex: 'modal',
    color: '#0036bb',
    backgroundColor: '#ffffff',
    position: 'absolute',
    right: '1%',
    top: '1%'
};
const buttonRestStyle = {
    zIndex: 'modal',
    color: '#0036bb55',
    backgroundColor: '#ffffff55',
    '&:hover': {
        color: '#0036bb',
        backgroundColor: '#ffffff'
    },
    position: 'absolute',
    right: '1%',
    top: '1%'
};
function PanZoom({ src , open , handleClose  }) {
    const text_list = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Array());
    const started = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const { 0: loaded , 1: setLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: buttonActive , 1: setButtonActive  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const zoomOptions = {
        minZoom: 0.1,
        maxZoom: 4
    };
    const panzoomRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const boxRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const divRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const modal_src = `modal-${src}`;
    const divMeasure = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((node)=>{
        divRef.current = node;
        startPZ();
    }, [
        loaded,
        open
    ]);
    const boxMeasure = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((node)=>{
        boxRef.current = node;
        startPZ();
    }, [
        loaded,
        open
    ]);
    function on_svg_ready() {
        _svg_utils__WEBPACK_IMPORTED_MODULE_4__/* .Fit */ .j3(modal_src, panzoomRef.current, boxRef.current);
        console.log("Modal pan zoom : created");
        if (_svg_utils__WEBPACK_IMPORTED_MODULE_4__/* .has_model */ .uW(src)) {
            _svg_utils__WEBPACK_IMPORTED_MODULE_4__/* .fetch_json */ .g9(src.replace(".svg", ".json")).then((model)=>{
                _svg_utils__WEBPACK_IMPORTED_MODULE_4__/* .setup_links */ .QT(modal_src, model);
            });
        }
    }
    function startPZ() {
        //console.log(`divRef.current:${divRef.current} ; boxRef.current:${boxRef.current} ; loaded:${loaded} ; started.current:${started.current}`)
        if (divRef.current != null && boxRef.current != null && loaded && !started.current) {
            panzoomRef.current = panzoom__WEBPACK_IMPORTED_MODULE_2___default()(divRef.current, zoomOptions);
            started.current = true;
            setButtonActive(true);
            setTimeout(()=>{
                setButtonActive(false);
            }, 2000);
            let svg = _svg_utils__WEBPACK_IMPORTED_MODULE_4__/* .get_svg_id */ .H7(modal_src);
            if (svg) {
                on_svg_ready();
            } else {
                //TODO not clear why this timeout is needed, the svg is underfined otherwise
                setTimeout(()=>{
                    on_svg_ready();
                }, 1);
            }
        }
        return;
    }
    function stopPZ() {
        //console.log(`Modal: stopPZ panzoomRef.current=${panzoomRef.current}`)
        if (panzoomRef.current) {
            panzoomRef.current.dispose();
            started.current = false;
            console.log(`Modal pan zoom : disposed`);
        }
    }
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Modal, {
        open: open,
        onClose: ()=>{
            stopPZ();
            handleClose();
        },
        "aria-labelledby": "modal-modal-title",
        "aria-describedby": "modal-modal-description",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
            ref: boxMeasure,
            sx: style,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                    ref: buttonRef,
                    onClick: ()=>{
                        stopPZ();
                        handleClose();
                    },
                    variant: "conained",
                    sx: buttonActive ? buttonActiveStyle : buttonRestStyle,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_6___default()), {})
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    ref: divMeasure,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_inlinesvg__WEBPACK_IMPORTED_MODULE_5___default()), {
                        src: src,
                        id: modal_src,
                        onLoad: ()=>{
                            setLoaded(true);
                        }
                    })
                })
            ]
        })
    }));
};


/***/ }),

/***/ 1098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PanZoomSlide)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var panzoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5773);
/* harmony import */ var panzoom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(panzoom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_PanZoomModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7515);
/* harmony import */ var _svg_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3218);
/* harmony import */ var _mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(682);
/* harmony import */ var _mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(216);
/* harmony import */ var _mui_icons_material_Link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);









function PanZoomSlide({ src , menu =false , width =600  }) {
    const started = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const { 0: loaded , 1: setLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: height , 1: setHeight  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Math.round(width / 2));
    const { 0: title , 1: setTitle  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(src.replace(/\.[^/.]+$/, ""));
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const zoomOptions = {
        minZoom: 0.1,
        maxZoom: 4
    };
    const boxRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const divRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const panzoomRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const stackRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    function startPZ() {
        //console.log("adding listener")
        if (loaded && divRef.current && !started.current) {
            panzoomRef.current = panzoom__WEBPACK_IMPORTED_MODULE_2___default()(divRef.current, zoomOptions);
            started.current = true;
            on_svg_pz_ready();
        }
    }
    function stopPZ() {
        //console.log(`stopPZ panzoomRef.current=${panzoomRef.current}`)
        if (started.current && panzoomRef.current) {
            panzoomRef.current.dispose();
            started.current = false;
        //console.log(`pan zoom : disposed`)
        }
    }
    function on_svg_pz_ready() {
        _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .Fit */ .j3(src, panzoomRef.current, boxRef.current);
        if (_svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .has_model */ .uW(src)) {
            _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .fetch_json */ .g9(src.replace(".svg", ".json")).then((model)=>{
                _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .setup_links */ .QT(src, model);
            });
        }
        let new_title = _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .get_title */ .ZV(src);
        if (new_title) {
            setTitle(new_title);
        }
        if (_svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .has_model */ .uW(src)) {
            _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .fetch_json */ .g9(src.replace(".svg", ".json")).then((model)=>{
                _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .setup_links */ .QT(src, model);
            });
        }
        //console.log(location.search)//empty
        //why not useRouter, because it has a bug : https://github.com/vercel/next.js/discussions/13220
        const query_list = router.asPath.split('?');
        if (query_list.length == 2) {
            const query = _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .search_to_query */ .hv(query_list[1]);
            if ("modal" in query && query.modal === src) {
                openModal();
            }
        }
    }
    function setLink() {
        router.push(`${router.pathname}#pz-${src}`);
    }
    function openModal() {
        if (!open) {
            //element.scrollTo(0,100)//not effective
            router.push(`${router.pathname}#pz-${src}?modal=${src}`) //,{scroll:false} not effective
            ;
            setOpen(true);
        }
    }
    function closeModal() {
        const url = `${router.pathname}#pz-${src}`;
        router.push(url, url, {
            scroll: false
        });
        setOpen(false);
    }
    function onHashChangeStart(url) {
        //not catching paste of same url with new search query params
        //from : http://localhost:3000/#pz-Linux_kernel_map.svg
        //to : http://localhost:3000/#pz-Linux_kernel_map.svg?modal=Linux_kernel_map.svg
        console.log(url);
    }
    function onComponentUnmount() {
        stopPZ();
    //router.events.off("hashChangeStart", onHashChangeStart);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        //console.log(`width is now (${width})`)
        const target_height = Math.round(width / 2);
        if (height != target_height) {
            setHeight(target_height);
        } else {
            //console.log(`fitting '${src}' now with new width (${width})`)
            _svg_utils__WEBPACK_IMPORTED_MODULE_5__/* .Fit */ .j3(src, panzoomRef.current, boxRef.current);
        }
    }, [
        height,
        width
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (loaded && divRef.current && !started.current) {
            startPZ();
            stopPZ();
        //router.events.on("hashChangeStart", onHashChangeStart);
        }
        return onComponentUnmount;
    }, [
        loaded
    ]);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                id: "mainContent",
                m: 1,
                sx: {
                    width: width
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Paper, {
                    elevation: 1,
                    sx: {
                        overflow: 'hidden'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Stack, {
                        id: `pz-${src}`,
                        ref: stackRef,
                        children: [
                            menu && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Stack, {
                                direction: "row",
                                spacing: 2,
                                justifyContent: "space-between",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                        variant: "h6",
                                        p: 1,
                                        children: title
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Stack, {
                                        direction: "row",
                                        spacing: 2,
                                        justifyContent: "flex-end",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                sx: {
                                                    zIndex: 'modal',
                                                    backgroundColor: '#ffffffaa'
                                                },
                                                onClick: ()=>{
                                                    setLink();
                                                },
                                                variant: "text",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Link__WEBPACK_IMPORTED_MODULE_7___default()), {})
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                sx: {
                                                    zIndex: 'modal',
                                                    backgroundColor: '#ffffffaa'
                                                },
                                                onClick: ()=>{
                                                    openModal();
                                                },
                                                variant: "text",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_6___default()), {})
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                                ref: boxRef,
                                sx: {
                                    height: height,
                                    position: 'relative'
                                },
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    ref: divRef,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("object", {
                                        type: "image/svg+xml",
                                        data: src,
                                        id: src,
                                        onLoad: ()=>{
                                            setLoaded(true);
                                        }
                                    })
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PanZoomModal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                src: src,
                open: open,
                handleClose: ()=>{
                    closeModal();
                }
            })
        ]
    }));
};


/***/ }),

/***/ 3218:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j3": () => (/* binding */ Fit),
/* harmony export */   "QT": () => (/* binding */ setup_links),
/* harmony export */   "H7": () => (/* binding */ get_svg_id),
/* harmony export */   "ZV": () => (/* binding */ get_title),
/* harmony export */   "g9": () => (/* binding */ fetch_json),
/* harmony export */   "uW": () => (/* binding */ has_model),
/* harmony export */   "hv": () => (/* binding */ search_to_query)
/* harmony export */ });
/* unused harmony exports Top, softReset, Reset, Center, FitHeight, FitWidth, flash_links */
/* harmony import */ var panzoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5773);
/* harmony import */ var panzoom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(panzoom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6868);
/* harmony import */ var _svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_1__);


function search_to_query(search) {
    return JSON.parse('{"' + decodeURI(search.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
}
function get_svg_id(src) {
    let el = document.getElementById(src);
    if (!el) {
        return null;
    }
    if (el.tagName == "OBJECT") {
        //console.log(el)
        //console.log(el.contentDocument)
        //console.log(el.contentDocument.getElementsByTagName('svg')[0])
        //  console.log(el.getSVGDocument())
        //https://www.w3.org/TR/SVG2/struct.html#InterfaceGetSVGDocument
        //.getElementsbyTagName("svg")[0]
        return document.getElementById(src).contentDocument.getElementsByTagName('svg')[0];
    } else if (el.tagName == "svg") {
        return el;
    }
}
function get_svg_size(src) {
    let svg = get_svg_id(src);
    let bbox = svg.getBBox();
    return {
        svg_width: bbox.width,
        svg_height: bbox.height
    };
}
function softReset(pzRef) {
    if (!pzRef) return;
    pzRef.zoomAbs(0, 0, 1);
    pzRef.moveTo(0, 0);
}
function Reset(pzRef, divRef, zoomOptions) {
    if (!pzRef) return null;
    pzRef.dispose();
    return panzoom(divRef, zoomOptions);
}
function Center(src, pzRef, boxRef) {
    if (!pzRef) return null;
    //pzRef = Reset(pzRef,divRef,zoomOptions)
    softReset(pzRef);
    let svg = get_svg_id(src);
    //let cbox = svg.getBoundingClientRect();
    let { svg_width , svg_height  } = get_svg_size(src);
    let scale = boxRef.clientWidth / svg_width;
    if (svg.hasAttributeNS(null, "width")) {
        let client_width = svg.getAttributeNS(null, "width");
        if (client_width.endsWith("px")) {
            client_width = Number(client_width.slice(0, -2));
        }
        scale = client_width / svg_width;
    }
    let offsetY = boxRef.clientHeight / 2 - svg_height * scale / 2;
    let offsetX = boxRef.clientWidth / 2 - svg_width * scale / 2;
    pzRef.moveTo(offsetX, offsetY);
    console.log(`moveto (${offsetX},${offsetY})`);
    return;
}
function FitHeight(src, pzRef, boxRef) {
    if (!pzRef) return;
    softReset(pzRef);
    let svg = get_svg_id(src);
    //let cbox = svg.getBoundingClientRect();
    let { svg_width , svg_height  } = get_svg_size(src);
    let scale = boxRef.clientWidth / svg_width;
    if (svg.hasAttributeNS(null, "width")) {
        let client_width = svg.getAttributeNS(null, "width");
        if (client_width.endsWith("px")) {
            client_width = Number(client_width.slice(0, -2));
        }
        scale = client_width / svg_width;
    }
    //console.log(`scale = ${scale}`)
    let offsetY = boxRef.clientHeight / 2 - svg_height * scale / 2;
    let offsetX = boxRef.clientWidth / 2 - svg_width * scale / 2;
    pzRef.moveTo(offsetX, offsetY);
    //console.log(`moveTo (${offsetX},${offsetY})`)
    let cbox = svg.getBoundingClientRect();
    let zoomX = boxRef.clientWidth / 2;
    let zoomY = boxRef.clientHeight / 2;
    let fit_height_zoom = boxRef.clientHeight / (svg_height * scale);
    pzRef.zoomAbs(zoomX, zoomY, fit_height_zoom);
//console.log(`zoomAbs (${zoomX},${zoomY},${fit_height_zoom})`)
}
function FitWidth(src, pzRef, boxRef) {
    if (!pzRef) return;
    softReset(pzRef);
    let svg = get_svg_id(src);
    //let cbox = svg.getBoundingClientRect();
    let { svg_width , svg_height  } = get_svg_size(src);
    let scale = boxRef.clientWidth / svg_width;
    if (svg.hasAttributeNS(null, "width")) {
        let client_width = svg.getAttributeNS(null, "width");
        if (client_width.endsWith("px")) {
            client_width = Number(client_width.slice(0, -2));
        }
        scale = client_width / svg_width;
    }
    //console.log(`scale = ${scale}`)
    let offsetY = boxRef.clientHeight / 2 - svg_height * scale / 2;
    let offsetX = boxRef.clientWidth / 2 - svg_width * scale / 2;
    pzRef.moveTo(offsetX, offsetY);
    //console.log(`moveTo (${offsetX},${offsetY})`)
    let cbox = svg.getBoundingClientRect();
    let fit_width_zoom = boxRef.clientWidth / (svg_width * scale);
    let zoomX = boxRef.clientWidth / 2;
    let zoomY = boxRef.clientHeight / 2;
    pzRef.zoomAbs(zoomX, zoomY, fit_width_zoom);
}
function Fit(src, pzRef, boxRef) {
    if (!pzRef) return;
    //console.log("running fit")
    let { svg_width , svg_height  } = get_svg_size(src);
    let svg_ratio = svg_width / svg_height;
    let box_ratio = boxRef.clientWidth / boxRef.clientHeight;
    if (svg_ratio > box_ratio) {
        FitWidth(src, pzRef, boxRef);
    } else {
        FitHeight(src, pzRef, boxRef);
    }
}
function Top(src, pzRef, boxRef) {
    if (!pzRef) return;
    softReset(pzRef);
    let svg = get_svg_id(src);
    //let cbox = svg.getBoundingClientRect();
    let { svg_width , svg_height  } = get_svg_size(src);
    let scale = boxRef.clientWidth / svg_width;
    if (svg.hasAttributeNS(null, "width")) {
        let client_width = svg.getAttributeNS(null, "width");
        if (client_width.endsWith("px")) {
            client_width = Number(client_width.slice(0, -2));
        }
        scale = client_width / svg_width;
    }
    //console.log(`scale = ${scale}`)
    let offsetY = boxRef.clientHeight / 2 - svg_height * scale / 2;
    let offsetX = boxRef.clientWidth / 2 - svg_width * scale / 2;
    pzRef.moveTo(offsetX, 0);
    //console.log(`moveTo (${offsetX},${offsetY})`)
    let cbox = svg.getBoundingClientRect();
    let fit_width_zoom = boxRef.clientWidth / (svg_width * scale);
    let zoomX = boxRef.clientWidth / 2;
    let zoomY = boxRef.clientHeight / 2;
    pzRef.zoomAbs(zoomX, zoomY, fit_width_zoom);
}
async function fetch_json(json_filename) {
    const response = await fetch(json_filename);
    return await response.json();
}
function setup_links(svg_id, json_data) {
    let svg = get_svg_id(svg_id);
    if (svg) {
        let draw = (0,_svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_1__.SVG)(svg);
        let text_nodes = draw.find('text');
        let text_array = [
            ...text_nodes
        ];
        text_array.forEach((text)=>{
            const key = text.node.innerHTML;
            if (key in json_data) {
                //text.linkTo(json_data[key])//link in same page
                text.linkTo((link)=>{
                    link.to(json_data[key]).target('_blank');
                }) //link in new page
                ;
                text.css({
                    'text-decoration': 'underline'
                });
            }
        });
    //text.fill('#f06')
    }
    return;
}
function flash_links(text_list, duration) {
    text_list.forEach((text)=>{
        text.fill({
            color: 'red'
        });
        setTimeout(()=>{
            text.fill({
                color: '#05236e'
            });
        }, duration);
    });
}
function get_title(svg_id) {
    let svg = get_svg_id(svg_id);
    if (!svg) {
        return "";
    }
    let title = "";
    let draw = (0,_svgdotjs_svg_js__WEBPACK_IMPORTED_MODULE_1__.SVG)(svg);
    let title_nodes = draw.find('title');
    let title_array = [
        ...title_nodes
    ];
    if (title_array.length > 0) {
        title = title_array[0].node.innerHTML;
    }
    return title;
}
function has_model(src) {
    if (src == "long_diag2.svg") {
        return true;
    } else if (src == "nRF52.svg") {
        return true;
    } else {
        return false;
    }
}



/***/ })

};
;
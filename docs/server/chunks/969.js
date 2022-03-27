"use strict";
exports.id = 969;
exports.ids = [969];
exports.modules = {

/***/ 8969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ SlidesList)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
// EXTERNAL MODULE: ./components/PanZoomSlide.js
var PanZoomSlide = __webpack_require__(1098);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/icons-material/Menu"
var Menu_ = __webpack_require__(3365);
;// CONCATENATED MODULE: ./components/react_utils.js

//https://usehooks.com/useLocalStorage/
// Hook
function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const { 0: storedValue , 1: setStoredValue  } = (0,external_react_.useState)(()=>{
        if (true) {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value)=>{
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (false) {}
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [
        storedValue,
        setValue
    ];
}


;// CONCATENATED MODULE: ./components/SlidesList.js







const AppSlider = (0,styles_.styled)(material_.Slider)(({ theme  })=>({
        height: 10,
        '& .MuiSlider-track': {
            border: 'none',
            opacity: 0.8,
            height: 10,
            backgroundColor: '#fff'
        },
        '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: '#fff'
        },
        '& .MuiSlider-thumb': {
            height: 30,
            width: 20,
            backgroundColor: '#bfbfbf',
            border: '0px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit'
            },
            '&:before': {
                display: 'none'
            }
        }
    })
);
function SlidesList({ list  }) {
    const minWidth = 400;
    const [stored_width, setStoredWidth] = useLocalStorage("slide_width", minWidth);
    const { 0: width , 1: setWidth  } = (0,external_react_.useState)(minWidth);
    const { 0: maxWidth , 1: setMaxWidth  } = (0,external_react_.useState)(minWidth);
    (0,external_react_.useEffect)(()=>{
        setWidth(stored_width);
    }, [
        stored_width
    ]);
    const boxRef = (0,external_react_.useCallback)((node)=>{
        if (node != null) {
            setMaxWidth(node.clientWidth - 60);
        }
    });
    //
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Box, {
        mb: 2,
        ref: boxRef,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(material_.AppBar, {
                position: "static",
                sx: {
                    backgroundColor: "#3c6d9e"
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Toolbar, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                            variant: "h6",
                            component: "div",
                            sx: {
                                flexGrow: 0
                            },
                            children: "Slide size"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(material_.Box, {
                            sx: {
                                width: 300
                            },
                            px: 2,
                            children: /*#__PURE__*/ jsx_runtime_.jsx(AppSlider, {
                                "aria-label": "Temperature",
                                value: width,
                                valueLabelDisplay: "auto",
                                step: 200,
                                marks: true,
                                min: minWidth,
                                max: maxWidth,
                                onChange: (e, newValue)=>{
                                    setWidth(newValue);
                                    setStoredWidth(newValue);
                                }
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(material_.Grid, {
                container: true,
                spacing: {
                    xs: 2,
                    md: 3
                },
                alignItems: "center",
                justifyContent: "space-evenly",
                children: list.map((file, index)=>/*#__PURE__*/ jsx_runtime_.jsx(material_.Grid, {
                        item: true,
                        xs: 2,
                        sx: {
                            minWidth: width
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(PanZoomSlide/* default */.Z, {
                            src: file,
                            width: width,
                            menu: true
                        })
                    }, index)
                )
            })
        ]
    }));
};


/***/ })

};
;
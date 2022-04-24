# next-svg
svg pan zoom as a react component on next js with adjustment buttons and Modal

## Live Demo
https://websvg.github.io/next-svg/

## Components
![Components](./Components%20Diagram.drawio.svg)
# Spec
* handle SVGs and images
## loading
* svg/images loaded dynamically from json input filenames
* all svgs of the entire page should be loaded at once (no lazy intersection loading) so that a text search can be performed on the entire page elements
* all images are fitted on page loading
## mouse
* panzoom object is disabled by default to allow window wheel vertical scroll
* cursor `grab` is always shown over the images to show the interaction possibility
* panzoom effect is run on startup on every slide to fit it entirely then deactivated (this is important because otherwise a text search would hit while the actual text would not be visible)
* panzoom is activated on user interaction after mouse down
* the mouse down can be continued to pan the image
## focus
* activation is show with a focus effect using a Paper with higher shadow and border solid style
* focus is lost from `focusout` event but leaving the images in its position
* loss of focus and deactivation allows the user to use the wheel mouse for vertical scrolling again
* re-gain of focus continues pan zoom with the same image position previously left
## actions
* fit button allows to adjust the image in the viewing area, fitting width or height depending on the ratio
* top button adjusts image width and starts from the top of the image (no vertical centering)
## modal
* Modal button open a full window Modal fitted image with active panzoom
* Modal is not 100% on width and height but a small percentage of darkened area is left
  * Modal exit with click away ondark area
  * Modal exit with X button that fades a bit after 2
  * Modal exit with keyboard key
* deep linking
* Modal supports json file with links
## gallery
* a list of files is passed as parameter to a gallery component
* a gallery panel can be opened and closed.
* an image thumbnail can be used for every svg file
* the gallery number of columns is responsive to the window size
* the gallery card are adjusted with a `Masonry` Effect
* every gallery card has a zoom cursor on the thumbnail that opens a Modal of the full sized image
* every gallery card shows the title and a link to smooth scroll down to the original item on the page
* Slides App bar to adjust slides size


## TODOs
* Table of Content with fixed position used also in presentation mode when combined with slides, do not open modal only takes to the ref link

## Limitations
* in Chrome touch generates : "Intervention unable to preventdefault inside passive event"
* timeout of 1 ms needed for second Modal open otherwise svg is undefined
# Code description
* using `panzoom` : https://github.com/anvaka/panzoom
* this lib pan zoom a `div` elements containing images or svg not the image or svg itself
* Page integration
    * multiple svgs (or images) needs an `object` or `embed` to protect each SVG style in a shadow DOM. Failing to do so corrupts SVGs visualization
    * svgs inside shadow documents do not let mouse events bubble up, therefore `panzoom` is only used to fit the size after loading and not for pan zoom. 
* Modal pan zoom
    * Adding `pointer-events: none;` in order to forward mouse events to the panzoom div on top conflicts with interactive linking of SVGs. It renders the SVG links inactive.
    * Fallback is therefor to `react-inlinesvg` that does not use `object` nor `embed` and allows mouse events to be used by the injected SVG and bubbled up to the top div for usage by `panzoom`
    * Given the usage in a Modal, the inline SVG does not conflict with others in the same page

* using panzoom with react : https://github.com/anvaka/panzoom/issues/212

## other pan zoom integrations
* `react-svg-pan-zoom` : https://github.com/chrvadala/react-svg-pan-zoom
    * needs to select tool before pan can start, separate pan and zoom, hidden background gets a different color than the firstly visible background
* `svg-pan-zoom` : https://github.com/bumbu/svg-pan-zoom
    * works with shadow document (embed, object)
    * cannot be imported in nextjs due to usage of window (front end only) in the module
    * Browser only integration needs to return with a `Script` tag referencing a manually copied .js
    * svg does not pan all over the parent but in the firstly defined creation window
* `timmywill / panzoom` : https://github.com/timmywil/panzoom
## SVG files
* files with top svg element containing width and height attributes will have fixed default width and height
* svg files without and with viwBox only will have responsive width
* `svg.getBoundingClientRect();` does not react immediatly so that right after calls to `zoomAbs()` or `moveTo()` the returned value is the old one before the calls. One way to solve this is to avoid using it and precompute what the returned value is supposed to be depdning on if the top svg has a fixed width or fits to parent width

# Credits and Links
* https://commons.wikimedia.org/wiki/File:Linux_kernel_map.svg
* https://commons.wikimedia.org/wiki/File:Ghostscript_Tiger.svg
* https://openclipart.org/detail/332727/vintage-flourish-divider-7
* https://www.homesmartmesh.com/docs/microcontrollers/nrf52/thread_sensortag/#zephyr-tag-firmware
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

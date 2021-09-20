const slides = [
  {
    type: "logo",
  },
  {
    type: "rotate",
  },
  {
    url: "./images/sf_houseboats.jpg",
    essentialRect: {"left":675,"top":105,"width":536,"height":754},
    type: "essentialRect",
    caption: "Agnostic composition means images looking good when fitted in different ascpect ratios",
    requireRotate: true,
  },
  {
    url: "./images/bali_surfers.jpg",
    essentialRect: {"left":672,"top":88,"width":528,"height":809},
    type: "essentialRect",
    caption: "Ultimately we have no control of what screens our images are shown on.",
    requireRotate: true,
  },
  {
    url: "./images/ocean_view.jpg",
    essentialRect: {"left":213,"top":257,"width":666,"height":552},
    type: "essentialRect",
    caption: "So why not let them look good anywhere?",
  },
  {
    type: "text",
    title: "What's going on?",
    text: `Agnostic compostion can be achieved by creating metadata for an image descibing its essential rectangle (essentialRect).  
The essentialRect will guaranteed to be shown, and the rest of the image is considered 'nice to have', 
and used to fill the remaining display area.`
  },
  {
    url: "./images/sax-hd-responsive-fit.jpg",
    essentialRect: { left: 825, top: 75, width: 621, height: 755 },
    type: "regular",
  },
  {
    url: "./images/sax.jpg",
    essentialRect: { left: 825, top: 75, width: 621, height: 755 },
    type: "essentialRect",
    caption: "The essentialRect is fit to the display area, with the remainder of the image being shown as space allows."
  },
  {
    type: "logo",
  },
];

export default slides;


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
    caption: "Agnostic composition means images looking good when fitted into different ascpect ratios",
    requireRotate: true,
  },
  {
    url: "./images/bali_surfers.jpg",
    essentialRect: {"left":672,"top":88,"width":528,"height":809},
    type: "essentialRect",
    caption: "Our images may be viewed in different presentation environments.",
    requireRotate: true,
  },
  {
    url: "./images/ocean_view.jpg",
    essentialRect: {"left":213,"top":257,"width":666,"height":552},
    type: "essentialRect",
    caption: "essentialRect allows them to look good anywhere.",
  },
  {
    type: "text",
    title: "What's going on?",
    text: `Each image has metadata that descibes its essential rectangle (essentialRect), that is guaranteed to be visible. The rest of the image is considered 'nice to have', 
and used to fill the remaining display area.`
  },
  {
    url: "./images/sax-hd-responsive-fit.jpg",
    type: "regular",
  },
  {
    url: "./images/sax.jpg",
    essentialRect: { left: 825, top: 75, width: 621, height: 755 },
    type: "essentialRect",
    caption: "The essentialRect is fit to the display area and centered as much as possible. The remainder of the image is shown as space allows."
  },
  {
    type: "logo",
  },
];

export default slides;


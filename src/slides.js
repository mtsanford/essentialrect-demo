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
    url: "./images/downtown_cropped.jpg",
    type: "regular",
    caption:
      "Photos are typically cropped before publishing to give it a good composition",
  },
  {
    url: "./images/downtown_cropped.jpg",
    type: "regular",
    caption:
      "This is an 'opinionated composition', and does not look good on different displays.",
    requireRotate: true,
  },
  {
    url: "./images/downtown_cropped.jpg",
    type: "regular",
    requireRotate: true,
  },
  {
    url: "./images/downtown_essentialrect.jpg",
    type: "regular",
    caption:
      "Instead, an essentialRect can be defined for the image, defining what is most important.",
  },
  {
    url: "./images/downtown_essentialrect.jpg",
    type: "regular",
    caption:
      "This is 'agnostic composition', and allows an image to look good on different displays",
  },
  {
    url: "./images/downtown.jpg",
    essentialRect: { left: 537, top: 72, width: 645, height: 602 },
    type: "essentialRect",
    requireRotate: true,
    caption: 'The image looks good in a wide range of aspect ratios'
  },
  {
    url: "./images/sax.jpg",
    type: "regular",
    caption: "Here is another example",
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
  },
  {
    type: "logo",
  },
];

export default slides;
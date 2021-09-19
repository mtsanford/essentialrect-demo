const slides = [
  {
    type: "logo",
  },
  {
    type: "rotate",
  },
  {
    url: "./images/downtown.jpg",
    type: "regular",
    caption: "This is a typical photo taken on a phone before editing",
    requireRotate: true,
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
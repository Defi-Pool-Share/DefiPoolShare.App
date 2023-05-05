const qs = (selector, parent = document) => {
  return parent.querySelector(selector);
};

const qst = (selector, parent = document) => {
  return parent.getElementsByTagName(selector);
};

const qsa = (selector, parent = document) => {
  return parent.querySelectorAll(selector);
};

const pathPrepare = (paths, dir) => {
  qsa(paths).forEach((path) => {
    const tl = path.getTotalLength();
    path.style.strokeDasharray = tl;
    path.style.strokeDashoffset = dir ? tl : 0;
  });
};

const numberFormat = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { qs, qst, qsa, pathPrepare, numberFormat };

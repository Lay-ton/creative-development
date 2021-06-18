// Function that calls model method and processes results
export default async (model, method, res) => {
  try {
    await model[method]();
    res.result = {...res.result, ...model.body};
    res.params = {...res.params, ...model.params};
    model.req.cookies = {...model.req.cookies, ...model.objectCookies};
    res.redirection = model.redirection && {...res.redirection, ...model.redirection};
  }
  finally {
    res.status(model.responseCode);
    model.headers.forEach((header) => res.header(header.name, header.value));
    model.cookies.forEach((cookie) => res.cookie(cookie.name, cookie.value, cookie.options));
    res.send(res.result);
  }
};

// @ts-ignore
const fether = (...args) => fetch(...args).then((res) => res.json());

export default fether;
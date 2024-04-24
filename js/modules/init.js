async function init() {
  try {
    const response = await fetch("../data/employee.json");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default init()
  .then((json) => {
    return json;
  })
  .catch((err) => console.error(err));

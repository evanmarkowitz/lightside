function newObjs(dataset, attributes, name, state) {
  console.log(state)
  const newDataSet = dataset.reduce((acc, item) => {
   const personObj = {}
    attributes.forEach(attribute => {
      personObj[attribute] = item[attribute]
    })
    acc.push({attributes: personObj})
    return acc
  }, [])
  setFavorite(newDataSet, name, state)
}
const setFavorite = (dataSet, name, state) => {
  const updatedData = dataSet.map(item => {
    item.favorited = false;
    item.category = name
    return item
  })
  state.setState({[name]: updatedData})
}

const fetchData = (url) => {
  return fetch(url).then(response => {
    return response.ok ? response.json() : Error('Error fetching data')
  })
}

const organizeData = (url, attributes, destination, state) => {
  fetchData(url)
    .then(response => newObjs(response.results, attributes, destination, state))
}

const setRandomFilm = (url, state) => {
  fetchData(url)
    .then(film => state.setState({ film }))
}
export { organizeData, setRandomFilm }
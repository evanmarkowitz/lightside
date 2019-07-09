function newObjs(dataset, attributes, name, state) {
  const newDataSet = dataset.reduce((acc, item) => {
   const personObj = {}
    attributes.forEach(attribute => {
      personObj[attribute] = item[attribute]
    })
    acc.push({attributes: personObj})
    return acc
  }, [])
  setFavorite(newDataSet, name, state)
  return newDataSet;
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
    if(!response.ok) {
      throw new Error('Error Fetching Data')
    } else {
      return response.json()
    }
  })
}

const organizeData = (url, attributes, destination, state) => {
  return fetchData(url)
    .then(response => newObjs(response.results, attributes, destination, state))
    .catch(error => state.setState({error: error.message}))
}

const setRandomFilm = (url, state) => {
  fetchData(url)
    .then(film => state.setState({ film }))
    .catch(error => state.setState({error: error.message}))
}
export { organizeData, setRandomFilm, newObjs, setFavorite, fetchData }
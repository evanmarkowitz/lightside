function newObjs(dataset, attributes, name) {
  const newDataSet = dataset.reduce((acc, item) => {
   const personObj = {}
    attributes.forEach(attribute => {
      personObj[attribute] = item[attribute]
    })
    acc.push(personObj)
    return acc
  }, [])
  setFavorite(newDataSet, name)
}
function setFavorite(dataSet, name) {
  const updatedData = dataSet.map(item => {
    item.favorited = false;
    item.category = name
    return item
  })
  this.setState({[name]: updatedData})
}

export default newObjs;
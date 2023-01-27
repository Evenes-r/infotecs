fetch ('https://dummyjson.com/products')

.then((res) => res.json())
.then((data) => getProducts(data))


let list = document.querySelector('.content-list')
let key

function getProducts({products}) {

  product = products.splice(0, 10)

  for (key in product) {
    list.innerHTML += `
    <li class = 'content-item' draggable = 'true'>
      <h4>${product[key].title}</h4>
      <div class = 'content-item__content'>
        <p>${product[key].description}</p>
        <p>${product[key].price}</p>
        <p>${product[key].rating}</p>
      </div>
    </li>`
  }
}

// ПЕРЕТАСКИВАНИЕ

const tasksListElement = document.querySelector(`.content-list`)
const taskElements = tasksListElement.querySelectorAll(`.content-item`)

tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`)
})
tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`)
})
const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect()
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2
  
  const nextElement = (cursorPosition < currentElementCenter) ? currentElement : currentElement.nextElementSibling
  return nextElement
}
tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault()
  
  const activeElement = tasksListElement.querySelector(`.selected`)
  const currentElement = evt.target
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`content-item`)
    
  if (!isMoveable) {
    return
  }
  
  const nextElement = getNextElement(evt.clientY, currentElement)
  
  if (
    nextElement && 
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return
  }
		
	tasksListElement.insertBefore(activeElement, nextElement)
})

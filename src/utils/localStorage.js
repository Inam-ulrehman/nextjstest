// =================Get Item From LocalStorage=======================
export const setItemInLocalStorage = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export const getItemFromLocalStorage = (item) => {
  const find = localStorage.getItem(item)
  const result = find ? JSON.parse(find) : null
  return result
}

export const removeItemFromLocalStorage = (item) => {
  localStorage.removeItem(item)
}

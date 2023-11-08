document.addEventListener('DOMContentLoaded', () => {
  const allSearchButtons = document.querySelectorAll('.searchBtn')
  const searchBar = document.querySelector('.searchBar')
  const searchInput = document.querySelector('#searchInput')
  const searchClose = document.querySelector('#searchClose')

  console.log(allSearchButtons)

  allSearchButtons.forEach((button) => {
    button.addEventListener('click', () => {
      searchBar.classList.add('open')
      this.setAttribute('aria-expanded', 'true')
      searchInput.focus()
    })
  })

  searchClose.addEventListener('click', () => {
    searchBar.classList.remove('open')
    this.setAttribute('aria-expanded', 'false')
  })
})

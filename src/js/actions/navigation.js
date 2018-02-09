// Navigation actions



export let NAVIGATION_CONNECT_PAGE = "NAVIGATION_CONNECT_PAGE";
export let NAVIGATION_HOME_PAGE = "NAVIGATION_HOME_PAGE";



export let NavigationActions = {
  navigateToConnectPage: () => ({
    type: NAVIGATION_CONNECT_PAGE,
  }),

  navigateToHomePage: () => ({
    type: NAVIGATION_HOME_PAGE
  })
}



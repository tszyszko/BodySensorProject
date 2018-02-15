// Navigation actions



export let NAVIGATION_CONNECT_PAGE = "NAVIGATION_CONNECT_PAGE";
export let NAVIGATION_HOME_PAGE = "NAVIGATION_HOME_PAGE";
export let NAVIGATION_ACTIVITY_PAGE = "NAVIGATION_ACTIVITY_PAGE";
export let NAVIGATION_SUMMARY_PAGE = "NAVIGATION_SUMMARY_PAGE";


export let NavigationActions = {
  navigateToConnectPage: () => ({
    type: NAVIGATION_CONNECT_PAGE,
  }),

  navigateToHomePage: () => ({
    type: NAVIGATION_HOME_PAGE
  }),

  navigateToActivityPage: () => ({
    type: NAVIGATION_ACTIVITY_PAGE
  }),

  navigateToSummaryPage: () => ({
    type: NAVIGATION_SUMMARY_PAGE
  })
}



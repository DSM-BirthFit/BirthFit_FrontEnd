export const SET_PAGENUMLIMIT = 'SET_PAGENUMLIMIT';
export const SET_POST = 'SET_POST';
export const SET_CURRENTPAGE = 'SET_CURRENTPAGE';
export const SET_MAXPAGENUMLIMIT = 'SET_MAXPAGENUMLIMIT';
export const SET_MINPAGENUMLIMIT = 'SET_MINPAGENUMLIMIT'

export const setPageNumLimit = (pageNumLimit) => {
    return {
        type: SET_PAGENUMLIMIT,
        pageNumLimit: pageNumLimit
    }
}

export const setPost = (everyPost) => {
    return {
        type: SET_POST,
        everyPost: everyPost
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENTPAGE,
        currentPage: currentPage
    }
}

export const setMaxPageNumLimit = (maxPageNumLimit) => {
    return {
        type: SET_MAXPAGENUMLIMIT,
        maxPageNumLimit: maxPageNumLimit
    }
}

export const setMinPageNumLimit = (minPageNumLimit) => {
    return {
        type: SET_MAXPAGENUMLIMIT,
        minPageNumLimit: minPageNumLimit
    }
}

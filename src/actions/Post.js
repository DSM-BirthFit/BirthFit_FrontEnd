export const SET_PAGENUMLIMIT = 'SET_PAGENUMLIMIT';
export const SET_TOTALPAGE = 'SET_TOTALPAGE';
export const SET_CURRENTPAGE = 'SET_CURRENTPAGE';
export const SET_MAXPAGENUMLIMIT = 'SET_MAXPAGENUMLIMIT';
export const SET_MINPAGENUMLIMIT = 'SET_MINPAGENUMLIMIT'

export const setPageNumLimit = (pageNumLimit) => {
    return {
        type: SET_PAGENUMLIMIT,
        pageNumLimit: pageNumLimit
    }
}

export const setTotal = (totlaPage) => {
    return {
        type: SET_TOTALPAGE,
        totlaPage
    }
}

export const setCurrentPage = (currentPage, currentPosts) => {
    return {
        type: SET_CURRENTPAGE,
        currentPage,
        currentPosts
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

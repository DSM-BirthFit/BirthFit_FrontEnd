export const SET_VIEW = 'SET_VIEW';
export const SET_LIKE = 'SET_LIKE';

export const setView = (answer, userImage, contents, createdAt, likeCount, isLike, isMine, title, userId, view) => {
    return {
        type: SET_VIEW,
        answer: answer,
        userImage: userImage,
        contents: contents,
        createdAt: createdAt,
        likeCount: likeCount,
        isLike: isLike,
        isMine: isMine,
        title: title,
        userId: userId,
        view: view
    }
}

export const setLike = (like) => {
    return {
        type: SET_LIKE,
        like: like
    }
}
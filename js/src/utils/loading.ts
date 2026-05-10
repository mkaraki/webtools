const setLoadingState = (isLoading: boolean, elementId: string = 'app') => {
    document.getElementById(elementId)?.classList.toggle('loading-dim', isLoading);
};

export {
    setLoadingState
}
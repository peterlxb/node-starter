var somePromise = new Promise((resolv,reject) => {
    setTimeout(() => {
        //resolv("It worked");
        reject("Unable to work")
    }, 2000);
})

somePromise.then((message) => {
    console.log("Success: ",message);
},(errorMsg) => {
    console.log("Failed: ",errorMsg);
});

function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = {
                1: { id: 1, name: "An" },
                2: { id: 2, name: "Bình" }
            };
            const user = users[id];
            if (user) resolve(user);
            else reject("User not found");
        }, 1000);
    });
}

fetchUser(2)
    .then(user => console.log(user))   // thành công
    .catch(err => console.error(err)); // thất bại
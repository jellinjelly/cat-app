const getData = () => {
    return fetch(`https://api.thecatapi.com/v1/breeds`)
        .then(res => res.json())
        .then(data => {
            let catNames = []
            data.forEach(cat => {
                catNames.push([cat.name, cat.id]);
            })
            
            catNames.forEach(name => {
                let node = document.createElement("option")
                node.innerHTML = name[0]
                let option = document.getElementById("catBreed").appendChild(node);
                option.setAttribute("value", name[0]);
            })

            getImages(catNames[0][1]);

            document.getElementById("catBreed").addEventListener("change", (e) => {
                let tempName = e.target.value;
                for(let [name, id] of catNames){
                    if(name === tempName){
                        getImages(id);
                    }
                }
            })

        })
}

function getImages(id){
    return fetch(`https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${id}`)
        .then(res => res.json())
        .then(imgs => {
            document.getElementById("cats").remove();
            let x = document.createElement("div");
            x.setAttribute("id", "cats");
            x.classList.add("row");
            document.querySelector(".container").appendChild(x);

            for(let img of imgs){
                let node = document.createElement("col");
                node.classList.add("col-4", "col")
                let imgNode = document.createElement("img");
                imgNode.setAttribute("src", img.url); 
                node.appendChild(imgNode);
                document.querySelector(".row").appendChild(node);
            }
            

        })

        // display imgs

}

getData();


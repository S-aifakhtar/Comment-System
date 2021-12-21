let username
let socket=io()

do{
    username=prompt('enter your name:')
} while(!username)

const textarea=document.querySelector('#textarea')
const submitBtn=document.querySelector('#submitBtn')

const commentBox=document.querySelector('.comment__box')

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let comment=textarea.value

    if(!comment)
    {
        return
    }
    postComment(comment)
})
function postComment(comment)
{
    //Append to dom
    let data={
        username: username,
        comment: comment
    }
    appendToDom(data)
    textarea.value=''
    //Broadcast//
    broadcastComment(data)
    //Syc with Mongodb
    syncWithDb(data)
}
function appendToDom(data)
{
    let lTag=document.createElement('li')
    lTag.classList.add('comment','mb-3')

    let markup=`
    <div class="card border-light mb-3">
        <div class="card-body">
            <h6>${data.username}</h6>
                <p>${data.comment}</p>
        </div>
    </div>

    `
    lTag.innerHTML=markup

    commentBox.prepend(lTag)
}
function broadcastComment(data)
{
    //socket
    socket.emit('comment',data)
}
socket.on('comment',(data)=>{
    appendToDom(data)
})

//Api calls

function syncWithDb(data){
    const headers={
        'Content-Type': 'application/json'
    }
    fetch('/api/comments',{ method: 'Post', body: JSON.stringify(data),header}).then(response=> response.json())
    .then(result=>{
        console.log(result)
    })
}

function fetchComments() {
    fetch('/api/comments')
    .then(res=>res.json())
    .then(result=>{
        result.forEach((comment)=>{
            appendToDom(comment)
        })
        
    })
}
window.onload=fetchCommments
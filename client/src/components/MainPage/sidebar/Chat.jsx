import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useRef, useContext } from "react";
import {SocketContext} from '../../../socketio';

function Chat() {
    let me = null;
    const logCheck = localStorage.getItem("token") || sessionStorage.getItem("token");
    if(logCheck) {
        me = JSON.parse(sessionStorage.getItem("token")).ID;
    } else {
        me = '익명n';
    }

    const socket = useContext(SocketContext);
    const [ chat, setChat ] = useState([]);
    const [ newChat, setNewChat ] = useState(false);
    const [ inputDisable, IsInputDisable ] = useState(true);
    // const inputActiveRef = useRef(false);

    const { register, handleSubmit, setValue } = useForm()

    useEffect(()=>{
        // console.log(`enter socket: ${socket.id}`);
        // socket.emit("enter");
        // socket.on("enter", (data) => {
        //     // console.log(data);
        //     setChat(data);
        // });
        socket.on('chatting', (data)=> {
            console.log(data);
            if(data.chatting === 'on'){
                console.log('버튼 활성화')
                IsInputDisable(false);
                // reload();
            } else {
                console.log('버튼 비활성화')
                IsInputDisable(true);
                // reload();
            }
            setNewChat(prev=>!prev);
        });
    },[]);

    useEffect(()=>{
        chat && 
        socket.on('message', (data)=>{
            setChat(data);
        });
        scrollToBottom()
    },[socket, chat]);

    useEffect(()=>{
        socket.emit("enter");
        socket.on('enter', (data)=>{
            // console.log(`다시: ${data.length}`);
            data.chatting === 'on'? IsInputDisable(false) : IsInputDisable(true)
            setChat(data.output);
        });
        scrollToBottom()
    },[socket, newChat]);

    // 채팅 전송
    const onValid = (data) => {
        const result = {
          id : `${socket.id}-${new Date()}`,
          user: me,
          body : data.msg,
        //   time : new Date(),
        }
        console.log(result);
        socket.emit("message", result);
        setValue('msg','');
    }

    const dateTime = (time) => {
        // console.log(time);
        const chatTime = new Date(time).toLocaleTimeString('en-Us', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return chatTime;
    }

   const renderChat = () => {
        console.log(`${socket.id}님의 채팅 렌더링 중`);
        // console.log(chat.length);
      return (
            chat.map((i, index) => (
                /* 관리자 채팅 */
                i.user === 'admin' ? (
                <ChatInfo key={index}>
                    <span>{i.body}</span>
                </ChatInfo> ) : ( 
                /* 내 채팅 */
                i.user === me ? 
                <ChatItem key={index}>
                    <ChatUser>
                        <span  style={{float: 'right'}}>{i.user}</span>
                    </ChatUser>
                    <ChatItemDiv style={{justifyContent:"flex-end"}}>
                    <ChatTime>{dateTime(i.time)}</ChatTime>
                    <ChatBodyM>
                        {i.body}
                    </ChatBodyM>
                    </ChatItemDiv>
                </ChatItem>
                :
                /* 상대방 채팅 */
                <ChatItem key={index}>
                    <ChatUser>
                        <span>{i.user}</span>  
                    </ChatUser>
                    <ChatItemDiv style={{justifyContent: "flex-start"}}>
                    <ChatBodyY>
                        {i.body}
                    </ChatBodyY>
                    <ChatTime>{dateTime(i.time)}</ChatTime>
                    </ChatItemDiv>
                </ChatItem>
            )
        )))
   }

    //스크롤 …
    const scrollRef = useRef();

    const scrollToBottom = () => {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
    }

    return (
      <Wrapper>
        <Container>

          {/* 채팅내용 */}
          <ChatSection>
              <ChatWrapper>
                {chat.length > 0 && renderChat()}
                <div ref={scrollRef} />
              </ChatWrapper>
          </ChatSection>

          {/* 채팅 입력창 */}
          <ChatInputSection>
              <ChatInputForm onSubmit={handleSubmit(onValid)}>
                  <ChatInputInput {...register("msg", {required: true})} placeholder="전송할 메세지를 입력해주세요" disabled={inputDisable}/>
                  <ChatInputBtn>
                      전송
                  </ChatInputBtn>
              </ChatInputForm>
          </ChatInputSection>

        </Container>
      </Wrapper>
    )
  }
  
  export default Chat;


const Wrapper = styled.body`
width: 100%;
height: 100vh;
margin: auto;
overflow-y: hidden;
padding-bottom: 56px;
`

const Container = styled.section`
width: 100%;
overflow-y: auto;
height: 100%;
display: flex;
justify-content: center;
flex-direction:column;
`

const ChatSection = styled.section`
width: 97%;
height: 86vh;
display: flex;
justify-content: center;
margin: auto;
`

const ChatWrapper = styled.div`
width : 100vw;
display: flex;
flex-direction: column;
overflow-y: scroll;
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-thumb {
    background-color: #8f8f8fb9;
}
::-webkit-scrollbar-track {
    background-color: #35353566;
}
`

const ChatItem = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 10px;
`
const ChatItemDiv = styled.div`
display: flex;
align-items: flex-end;
font-size: 0.9rem;
`

const ChatUser = styled.div`
margin: 0 5px 5px 5px;
font-size: 12px;
font-weight: 600;
color : #A2A2A6;
`

const ChatTime = styled.span`
font-size: 12px;
font-weight: 600;
color : #A2A2A6;
`

const ChatBody = styled.div`
max-width: 70%;
line-height: 1.4;
border-radius: 10px;
padding: 15px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const ChatBodyM = styled(ChatBody)`
background-color: #FFD95B;
border-bottom-right-radius: 0px;
margin-left: 8px;
`

const ChatBodyY = styled(ChatBody)`
background-color: #BABABA;
border-bottom-left-radius: 0px;
margin-right: 8px;
`

//
const ChatInfo = styled.div`
margin-top: 30px;
margin-bottom: 30px;
display: flex;
flex-direction: column;
text-align: center;
font-size: 13px;
font-weight: 500;
color : #A2A2A6;
span{
    margin-bottom: 10px;
}
`

//
const ChatInputSection = styled.section`
width: inherit;
background-color: #FFD95B;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
`

const ChatInputForm = styled.form`
width : 95%;
/* max-width: ${props => props.theme.maxWidth}; */
display: flex;
justify-content: space-between;
`

const ChatInputInput = styled.input`
width: 88%;
border: none;
padding: 7px 10px;
border-radius: 5px;
::placeholder {
    color: #A2A2A6;
}
:focus {
    outline-color: #FFD95B;
}
`

const ChatInputBtn = styled.button`
width: 10%;
color:white;
border: none;
border-radius: 5px;
background-color: #FFA726;
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
cursor: pointer;
`
import React from 'react'
import { Avatar, HStack ,Text } from '@chakra-ui/react'
 
const Message = ({text,uri,user="other"}) => {
  return (

    <HStack alignSelf={user==="me"?"flex-end":"flex-start"}  borderRadius={'base'} bg={'gray.100'} padding={'2'}>
         {
            user==="other"?<Avatar size={'sm'} src={uri} />:<></>
        } 
        <Text padding={'2'}>{text}</Text>
        {
            user==="me"?<Avatar size={'sm'} src={uri} />:<></>
        }   
    </HStack>
)
}

export default Message
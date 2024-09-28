import React from 'react';
import {
    ChakraProvider, 
    Radio,
    RadioGroup,
    Stack
  } from '@chakra-ui/react';
  
function DeadlineDisplay() {
    return(
       <div>
        <h1> Deadlines </h1>
       <RadioGroup defaultValue='1'>
        <Stack>
          <Radio value='1'>
            EECS 281 Project
          </Radio>
          <Radio value='2'>EECS HW</Radio>
          <Radio value='3'>MATH 215 </Radio>
        </Stack>
      </RadioGroup>
      </div>
    );
}
export default DeadlineDisplay;
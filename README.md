## tRPC + Prisma

좀 어려웠다.  
그큐엘에서 정성들여 짠 스키마를 서버에만 두는 게 아까워서 공부했다.  
서버에서 하나의 스키마로 타입을 통용하기 위해선  
- typeGraphQl 
- Prisma  

로 충분하다. 근데 난 프론트고  
이것만으론 안 되는 것임..  
그래서 이를 클라이언트에서도 읽히게 하기 위해  
- Prisma + Nexus 를,  

공부한 건 아니고 맛만 봤는데ㅎ  
스키마를 바탕으로 클라이언트의 타입 파일을 생성해주지만,  
과정이 복잡했고, 내가 생각했던 바의 것은 아니었다.  
내가 생각했던 그건 tRPC 방식이었음  

암튼 내내 끌려다닌 기분인데  
오류 잡다가 살짝 감이 온다  
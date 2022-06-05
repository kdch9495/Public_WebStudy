import React, {Component} from 'react';
import Customer from './components/Customer'
import './App.css';

const customers = [
  {
    'id' : 1,
    'image' : 'http://placeimg.com/64/64/1',
    'name' : '동찬',
    'birthday' : '951221',
    'gender' : '남성',
    'job' : '직짱인'
  },
  {
    'id' : 2,
    'image' : 'http://placeimg.com/64/64/2',
    'name' : '길동',
    'birthday' : '951222',
    'gender' : '남성',
    'job' : '프로그래머'
  },
  {
    'id' : 3,
    'image' : 'http://placeimg.com/64/64/3',
    'name' : '찬동',
    'birthday' : '951223',
    'gender' : '남성',
    'job' : '직짱인3'
    }
]

class App extends Component {
  render() { 
    return (
      <div>
        {
        /*
        // 하나만 화면에 출력하고 싶을 떄는 아래와 같이 사용 
        <Customer
          id={customers[0].id}
          image={customers[0].iamge}
          name={customers[0].name}
          birthday={customers[0].birthday}
          gender={customers[0].gender}
          job={customers[0].job}
        />
        */
        }
        {
          customers.map(c => {
            return (
              <Customer
                key={c.id} // map을 사용할때는 key를 반드시 사용해야 함 
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            ) 
          })
        }
      </div>
    );
  }
}

export default App;

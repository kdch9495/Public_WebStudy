import React, {Component} from 'react';
import Customer from './components/Customer' //customer component 적용
import './App.css';

//material-ui: material-ui.com/demos/tables 공식 reference 참고하여 Table 작성하기
import Paper from '@material-ui/core/Paper'; // component의 외부를 감싸기 위한 component
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

// styles 변수 정의
const styles= theme => ({
  // 바깥 쪽에 해당하는 root
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3, // 여백을 3의 가중치만큼 주기
    overflowX: "auto" // X축으로 overflow가 작용
  },
  table: {
    minWidth: 1080 // 무조건 1080픽셀 이상 출력되어 가로스크롤바 생성됨
  }
})

// const customers = [
//   {
//     'id' : 1,
//     'image' : 'http://placeimg.com/64/64/1',
//     'name' : '동찬',
//     'birthday' : '951221',
//     'gender' : '남성',
//     'job' : '직짱인'
//   },
//   {
//     'id' : 2,
//     'image' : 'http://placeimg.com/64/64/2',
//     'name' : '길동',
//     'birthday' : '951222',
//     'gender' : '남성',
//     'job' : '프로그래머'
//   },
//   {
//     'id' : 3,
//     'image' : 'http://placeimg.com/64/64/3',
//     'name' : '찬동',
//     'birthday' : '951223',
//     'gender' : '남성',
//     'job' : '직짱인3'
//     }
// ]

class App extends Component {

  // state는 변경 가능한 변수 처리
  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json(); // json 형태로 body 변수에 담겠다
    return body;
  }

  render() { 
    const { classes } = this.props; // styles가 적용될 수 있게끔 함. props는 변경 불가능한 변수
    return (
      <Paper className={classes.root}>

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
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.customers ? this.state.customers.map(c => {
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
              }) : ""}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

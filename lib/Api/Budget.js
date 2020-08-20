import Api from '@lib/Api/Api';

class Budget extends Api {
  constructor() {
    super({path:'http://localhost:3000/api/budget'});
  }
}

export default Budget;

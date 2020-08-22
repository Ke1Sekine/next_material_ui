import Api from '@lib/Api/Api';

class Budget extends Api {
  constructor() {
    super({ path:'http://localhost:3000/api/users_by_device'});
  }
}

export default Budget;

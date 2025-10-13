class bank():
    def __init__(self,account,balance):
        self.account = account
        self.balance = balance
    
    def deposit(self,amount):
        self.balance += amount
        print(f"{amount} was deposited")
        return self
    
    def withdraw(self,amount):
        self.balance -= amount
        print(f"{amount} was withdrawn")
        return self
        
    def showbalance(self):
        print(f"your balance is: {self.balance}")
        
account1 = bank("HAB", 100)

account1.showbalance()
account1.deposit(50).showbalance()
account1.withdraw(20).showbalance()

import pandas as pd
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer

#Load data
aapl = pd.read_csv('../data/train.csv', index_col='Id')
#
#Remove empty values from saleprice row 
aapl.dropna(axis=0, subset=['SalePrice'], inplace=True)
#Set target to new saleprice column without empty values
y = aapl.SalePrice
#Drop saleprice from columns to use the rest as features
aapl.drop(['SalePrice'], axis=1, inplace=True)
#Set features
x = aapl.select_dtypes(exclude=['object'])
#Set test parameters

#Split data into training and test
train_x, val_x, train_y, val_y = train_test_split(x,y, train_size=0.8, test_size=0.2, random_state=1)
#Get mean absolute error
def getMAE(max_leaf_nodes, train_x, val_x, train_y, val_y):
    model = RandomForestRegressor( n_estimators=max_leaf_nodes, random_state=1)
    model.fit(train_x, train_y)
    validation = model.predict(val_x)
    mae = mean_absolute_error(val_y, validation)
    print(f'actual price: {val_y.values}')
    print(f'predicted price: {validation}')
    return mae

#Set Leafs
Leafs = [100] 

#---APPROACH 1 -----
#get names of columns with missing values
missing_columns = [col for col in train_x.columns if train_x[col].isnull().any() ]
#remove missing columns from both training and validation
reduced_X_train = train_x.drop(missing_columns, axis=1)
reduced_X_valid = val_x.drop(missing_columns, axis=1)
#---------------------SCORE: 422266.7376

#---APPROACH 2 -----
#define imputator
imp = SimpleImputer()
imp_x_train = pd.DataFrame(imp.fit_transform(train_x))
imp_x_valid = pd.DataFrame(imp.transform(val_x))
#after imputating names were removed. put them back.
imp_x_train.columns = train_x.columns
imp_x_valid.columns = val_x.columns
#---------------------SCORE: SAME

#---APPROACH 3 -----
#copy original data (when imputing)
#copyX_train = train_x.copy()
#copyX_valid = val_x.copy()
#track the removed columns to be imputed
#for col in missing_columns:
    #copyX_train[col + '_was_missing'] = copyX_train[col].isnull()
    #copyX_valid[col + '_was_missing'] = copyX_valid[col].isnull()
#impute same as approach 2
#copy_x_train = pd.DataFrame(imp.fit_transform(copyX_train))
#copy_x_valid = pd.DataFrame(imp.transform(copyX_valid))
#after imputating names were removed. put them back.
#copy_x_train.columns = train_x.columns
#copy_x_valid.columns = val_x.columns
#---------------------SCORE:
 

print(train_x.shape)
missing_value_count_columns = (train_x.isnull().sum())
print(missing_value_count_columns[missing_value_count_columns > 0])
#loop throught each max leaf count
#for leaf in Leafs:
    #print(f'mae score: {getMAE(leaf, reduced_X_train, reduced_X_valid, train_y, val_y)}')
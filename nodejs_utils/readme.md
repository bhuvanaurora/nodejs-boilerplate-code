List of utils

** To import all the utils "require('./util')". Index file gets all the utils **

******************* Sample *****************

One function per util. Function name describes the util

- functionName
	- require('./utils/functionname') ;
	- params
		- param 1
		- param 2
		- param 3

********************************************

- checkAttsForPresence
	- require('./nodejs_utils/checkattsforpresence').checkAttsForPresence ;
	- atts, values (values in atts used to get values)
		- atts = ['att1', 'att2']
		- values = {'att1':'value1' , 'att2':'value2'}
	- returns false if any attribute is undefined
	- returns true if all attributes are present


- checkAttsType
	- require('./nodejs_utils/checkattstype').checkAttsType ;
	- atts, values (values in atts used to get values)
		- atts = ['att1', 'att2']
		- values = {'att1':{'value':'value1','type':'typeof1'} , 'att2':{'value':'value2','type':'typeof2'}}
	- returns false if any attribute type does not match
	- returns true if all attributes match the type specified


- checkAttsForNotNull
	- require('./nodejs_utils/checkattsfornotnull').checkAttsForNotNull ;
	- atts, values (values in atts used to get values)
		- atts = ['att1', 'att2']
		- values = {'att1':'value1' , 'att2':'value2'}
	- returns false if any value is null
	- return true if all values are not null


- stackTrace (Just import the file and it assigns variables in global namespace)
	- require('./nodejs_utils/stacktrace') ;
	- __line (Line number of the log)
	- __function (Function name of the log)
	- __fullStackTrace (For complete stacktrace) UNUSABLE IN MOST SITUATIONS


- startServer
	- require('./nodejs_utils/startserver') ;
		- app (where "app = express() ;")
	- returns listen


- stopServer (Gracefully handles server exit)
	- require('./nodejs_utils/stopserver') ;
		- process (nodejs process variable)



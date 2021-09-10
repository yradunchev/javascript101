
function FixedQueue( size, initialValues ){
  initialValues = (initialValues || []);
  var queue = Array.apply( null, initialValues );
  queue.fixedSize = size;
  queue.unshift = FixedQueue.unshift;
  FixedQueue.trimTail.call( queue );
  return( queue );
}


FixedQueue.trimTail = function(){
  if (this.length <= this.fixedSize){
    return;
  }
  Array.prototype.splice.call(
    this,
    this.fixedSize,
    (this.length - this.fixedSize)
  );
};


FixedQueue.wrapMethod = function( methodName, trimMethod ){
  var wrapper = function(){
    var method = Array.prototype[ methodName ];
    var result = method.apply( this, arguments );
    trimMethod.call( this );
    return( result );
  };
  return( wrapper );
};


FixedQueue.unshift = FixedQueue.wrapMethod(
  "unshift",
  FixedQueue.trimTail
);


// Create a fixed queue with some values.
var friends = FixedQueue( 10 );
console.log( friends );

// Add 2 items to the head.
friends.unshift( "Tricia", "Anna", "Adam", "Eve", "Peter" );
console.log( friends )
friends.unshift( "Kit", "Sarah", "Steve", "Ben", "Willam" );
console.log( friends )
friends.unshift( "Jordi" );
console.log( friends );
console.log( friends[3] );

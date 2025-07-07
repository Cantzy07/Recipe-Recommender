from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.Float, unique=False, nullable=False)
    preference_vector = db.Column(db.JSON, unique=False, nullable=False)
    
    # Relationship with Recipes
    recipes = db.relationship('Recipe   ', backref='User', cascade="all, delete-orphan")

    def to_json(self):
        return {
            'id': self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "preference_vector": self.preference_vector,
            "recipes": [r.to_json() for r in self.recipes]
        }

class Recipes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredients = db.Column(db.String(250), nullable=False)
    instructions = db.Column(db.String(250), nullable=False)
    
    # Foreign key to Lifter
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            "ingredients": self.ingredients,
            "instructions": self.instructions
        }
    
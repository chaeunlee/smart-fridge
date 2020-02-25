import sys
import json

with open('ingredients.json', 'w') as f:
    ret = []
    for ingredient in sys.argv[1:]:
        tmp_dict={}
        name = ingredient.replace('.png', '')
        if '-' in name:
            name = name[:name.find('-')]
        ingredient = "require('../assets/ingredients/{}')".format(ingredient)
        tmp_dict[name] = ingredient
        ret.append(tmp_dict)
    json.dump(ret, f)



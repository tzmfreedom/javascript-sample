.PHONY: test/target
test/target:
	for target in es3 es5 es6 esnext; do \
	  echo; \
	  echo "target: $$target"; \
	  tsc target.ts --target $$target && cat target.js; \
	done

.PHONY: test/module
test/module:
	for module in commonjs amd es2015 esnext; do \
	  echo; \
	  echo "module: $$module"; \
	  tsc module.ts --module $$module && cat module.js; \
	done

